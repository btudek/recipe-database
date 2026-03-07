// Recipe Nightly Full Audit Script
// Crawls recipes and validates against QA criteria

const FAIL_CONDITIONS = {
  WRONG_MISSING_PHOTO: 'wrong/missing photo',
  MIN_INGREDIENTS: '<3 ingredients',
  MIN_STEPS: '<3 steps',
  BROKEN_PAGE: 'broken page',
  PLACEHOLDER_CONTENT: 'placeholder content',
  ZERO_TIME: 'zero/unrealistic time'
};

const CUISINES = [
  'italian', 'mexican', 'chinese', 'japanese', 'indian', 
  'french', 'thai', 'american', 'mediterranean', 'korean',
  'vietnamese', 'greek', 'spanish', 'brazilian', 'middle-eastern'
];

const CATEGORIES = [
  'breakfast', 'lunch', 'dinner', 'desserts', 'appetizers',
  'soups', 'salads', 'baking', 'snacks', 'drinks'
];

async function auditRecipe(page, url) {
  const result = {
    url,
    passed: true,
    issues: [],
    title: null,
    imageOk: false,
    ingredientsCount: 0,
    stepsCount: 0,
    description: null,
    prepTime: 0,
    cookTime: 0,
    totalTime: 0
  };

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    
    // Get page title
    const title = await page.title();
    result.title = title;
    
    // Check for broken page indicators
    if (title.includes('404') || title.includes('Not Found') || title.includes('Error')) {
      result.passed = false;
      result.issues.push(FAIL_CONDITIONS.BROKEN_PAGE);
      return result;
    }

    // Extract recipe data from page
    const recipeData = await page.evaluate(() => {
      const data = {
        heading: null,
        description: null,
        imageSrc: null,
        ingredients: [],
        steps: [],
        times: { prep: 0, cook: 0, total: 0 }
      };
      
      // Get heading
      const h1 = document.querySelector('h1');
      data.heading = h1?.textContent?.trim();
      
      // Get description (first paragraph after heading)
      const descEl = document.querySelector('main p');
      data.description = descEl?.textContent?.trim();
      
      // Get image
      const img = document.querySelector('main img');
      data.imageSrc = img?.src;
      
      // Get ingredients (list items in ingredients section)
      const ingredientSection = Array.from(document.querySelectorAll('main')).find(el => 
        el.textContent.includes('Ingredients')
      );
      if (ingredientSection) {
        const items = ingredientSection.querySelectorAll('li');
        data.ingredients = Array.from(items).map(li => li.textContent.trim()).filter(t => t);
      }
      
      // Get steps
      const stepsSection = Array.from(document.querySelectorAll('main')).find(el => 
        el.textContent.includes('Instructions') || el.textContent.includes('Steps')
      );
      if (stepsSection) {
        const items = stepsSection.querySelectorAll('li');
        data.steps = Array.from(items).map(li => li.textContent.trim()).filter(t => t);
      }
      
      // Get times from text content
      const mainText = document.querySelector('main')?.textContent || '';
      const prepMatch = mainText.match(/Prep:\s*(\d+)/);
      const cookMatch = mainText.match(/Cook:\s*(\d+)/);
      const totalMatch = mainText.match(/Total:\s*(\d+)/);
      
      if (prepMatch) data.times.prep = parseInt(prepMatch[1]);
      if (cookMatch) data.times.cook = parseInt(cookMatch[1]);
      if (totalMatch) data.times.total = parseInt(totalMatch[1]);
      
      return data;
    });

    result.description = recipeData.description;
    result.ingredientsCount = recipeData.ingredients.length;
    result.stepsCount = recipeData.steps.length;
    result.prepTime = recipeData.times.prep;
    result.cookTime = recipeData.times.cook;
    result.totalTime = recipeData.times.total;
    
    // Check image
    if (!recipeData.imageSrc || 
        recipeData.imageSrc.length < 10 || 
        recipeData.imageSrc.includes('placeholder') ||
        recipeData.imageSrc.includes('undefined')) {
      result.passed = false;
      result.issues.push(FAIL_CONDITIONS.WRONG_MISSING_PHOTO);
    } else {
      result.imageOk = true;
    }
    
    // Check ingredients count
    if (recipeData.ingredients.length < 3) {
      result.passed = false;
      result.issues.push(FAIL_CONDITIONS.MIN_INGREDIENTS);
    }
    
    // Check steps count
    if (recipeData.steps.length < 3) {
      result.passed = false;
      result.issues.push(FAIL_CONDITIONS.MIN_STEPS);
    }
    
    // Check description
    if (!recipeData.description || recipeData.description.length < 10) {
      result.passed = false;
      result.issues.push('missing/short description');
    }
    
    // Check realistic times (totalTime should be > 0 for most recipes)
    // Allow 0 for no-cook recipes like salads
    if (recipeData.times.total === 0 && 
        recipeData.times.prep === 0 && 
        recipeData.times.cook === 0) {
      // Check if it's not a no-cook recipe
      const isNoCook = recipeData.heading && (
        recipeData.heading.toLowerCase().includes('salad') ||
        recipeData.heading.toLowerCase().includes('sauce') ||
        recipeData.heading.toLowerCase().includes('smoothie')
      );
      if (!isNoCook) {
        result.passed = false;
        result.issues.push(FAIL_CONDITIONS.ZERO_TIME);
      }
    }
    
    // Check for placeholder content (generic text)
    const genericPhrases = ['Lorem ipsum', 'test recipe', 'placeholder', 'TODO'];
    const contentText = (recipeData.heading || '') + ' ' + (recipeData.description || '');
    for (const phrase of genericPhrases) {
      if (contentText.toLowerCase().includes(phrase.toLowerCase())) {
        result.passed = false;
        result.issues.push(FAIL_CONDITIONS.PLACEHOLDER_CONTENT);
        break;
      }
    }
    
  } catch (e) {
    result.passed = false;
    result.issues.push(FAIL_CONDITIONS.BROKEN_PAGE + ': ' + e.message);
  }
  
  return result;
}

module.exports = { auditRecipe, FAIL_CONDITIONS, CUISINES, CATEGORIES };
