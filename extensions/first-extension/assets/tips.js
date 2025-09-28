// Beauty Tips Generator for Shopify Extension
// Converts Python tip dictionaries to JavaScript for frontend use

const SKIN_TYPE_TIPS = {
  Dry: [
    "Use a gentle, cream-based cleanser to avoid stripping natural oils.",
    "Apply a rich, hydrating moisturizer twice daily.",
    "Look for products with hyaluronic acid and ceramides.",
    "Use a humidifier in your bedroom to add moisture to the air.",
    "Avoid hot water when washing your face - use lukewarm instead.",
    "Consider using a facial oil as the last step in your nighttime routine.",
  ],
  Normal: [
    "Maintain your routine with a balanced cleanser and moisturizer.",
    "Use sunscreen daily to prevent premature aging.",
    "Incorporate antioxidants like vitamin C into your morning routine.",
    "Exfoliate 1-2 times per week to maintain smooth skin texture.",
    "Stay hydrated by drinking plenty of water throughout the day.",
    "Consider adding a weekly hydrating mask to your routine.",
  ],
  Oily: [
    "Use a foaming or gel-based cleanser to control excess oil.",
    "Look for non-comedogenic, oil-free moisturizers.",
    "Incorporate salicylic acid or niacinamide to regulate oil production.",
    "Use clay masks 1-2 times per week to absorb excess oil.",
    "Don't skip moisturizer - dehydrated skin can produce more oil.",
    "Consider using blotting papers throughout the day instead of over-washing.",
  ],
}

const EYE_COLOR_TIPS = {
  Brown: [
    "Enhance brown eyes with warm eyeshadow tones like gold, bronze, and copper.",
    "Purple and plum shades create beautiful contrast with brown eyes.",
    "Try navy blue eyeliner instead of black for a softer look.",
    "Green eyeshadows can make brown eyes appear more vibrant.",
  ],
  Blue: [
    "Warm tones like peach, coral, and bronze complement blue eyes beautifully.",
    "Orange and copper eyeshadows make blue eyes pop.",
    "Brown eyeliner can be more flattering than black for everyday wear.",
    "Avoid blue eyeshadows that match your eye color exactly.",
  ],
  Green: [
    "Purple and plum shades are perfect for making green eyes stand out.",
    "Red and pink tones create stunning contrast with green eyes.",
    "Golden and bronze shades enhance the warmth in green eyes.",
    "Brown eyeliner often looks more natural than black with green eyes.",
  ],
  Hazel: [
    "Bring out golden flecks with warm browns and golds.",
    "Purple shades can emphasize green tones in hazel eyes.",
    "Experiment with both warm and cool tones to see what works best.",
    "Bronze and copper eyeshadows enhance the complexity of hazel eyes.",
  ],
  Gray: [
    "Silver and charcoal eyeshadows complement gray eyes naturally.",
    "Purple and plum shades can make gray eyes appear more blue.",
    "Warm browns can bring out any golden flecks in gray eyes.",
    "Black eyeliner creates striking definition with gray eyes.",
  ],
}

const ACNE_SEVERITY_TIPS = {
  0: [
    "Maintain your current skincare routine to keep skin clear.",
    "Use a gentle cleanser and non-comedogenic moisturizer.",
    "Don't forget daily sunscreen to prevent post-inflammatory hyperpigmentation.",
    "Consider incorporating antioxidants like vitamin C for overall skin health.",
  ],
  1: [
    "Use a gentle salicylic acid cleanser to prevent clogged pores.",
    "Spot treat blemishes with benzoyl peroxide or tea tree oil.",
    "Avoid over-cleansing, which can irritate skin and worsen breakouts.",
    "Use non-comedogenic products to prevent further clogging.",
  ],
  2: [
    "Consider adding a retinoid to your nighttime routine (start slowly).",
    "Use salicylic acid or benzoyl peroxide products consistently.",
    "Don't pick at blemishes - this can lead to scarring.",
    "Consider seeing a dermatologist for personalized treatment options.",
  ],
  3: [
    "Consult with a dermatologist for prescription treatment options.",
    "Be gentle with your skin - avoid harsh scrubbing or over-treatment.",
    "Consider professional treatments like chemical peels or light therapy.",
    "Maintain a consistent, gentle routine while seeking professional help.",
  ],
}

const SEGMENTATION_TIPS = {
  background: [
    "Focus on overall skin health with a consistent daily routine.",
    "Use products appropriate for your skin type and concerns.",
  ],
  skin: [
    "Maintain healthy skin with proper cleansing and moisturizing.",
    "Use sunscreen daily to protect against UV damage and premature aging.",
  ],
  nose: [
    "The nose area tends to be oilier - consider using pore strips occasionally.",
    "Use a gentle exfoliant to prevent blackheads in the nose area.",
  ],
  eye_g: [
    "Use a gentle eye cream to keep the delicate eye area moisturized.",
    "Consider using an eye cream with caffeine to reduce puffiness.",
  ],
  l_eye: [
    "Apply eye cream gently with your ring finger to avoid pulling the skin.",
    "Use products specifically formulated for the delicate eye area.",
  ],
  r_eye: [
    "Be consistent with eye care on both sides of your face.",
    "Consider using an eye mask weekly for extra hydration.",
  ],
  l_brow: [
    "Keep eyebrows well-groomed to frame your face beautifully.",
    "Use a brow serum if you want to encourage fuller growth.",
  ],
  r_brow: [
    "Maintain symmetrical brow care for balanced facial features.",
    "Consider professional brow shaping for the best results.",
  ],
  l_ear: [
    "Don't forget to apply sunscreen to your ears when spending time outdoors.",
    "Keep ears clean and dry to prevent irritation.",
  ],
  r_ear: [
    "Include ears in your skincare routine, especially sun protection.",
    "Be gentle when cleaning around the ear area.",
  ],
  mouth: [
    "Keep lips moisturized with a good lip balm, especially in dry weather.",
    "Exfoliate lips gently once a week to remove dead skin.",
  ],
  u_lip: [
    "Use lip balm with SPF during the day to protect from sun damage.",
    "Consider using a lip treatment at night for extra hydration.",
  ],
  l_lip: [
    "Keep lips hydrated to prevent cracking and maintain smoothness.",
    "Avoid licking lips as this can cause more dryness.",
  ],
  hair: [
    "Healthy hair starts with a healthy scalp - keep it clean and moisturized.",
    "Use products appropriate for your hair type and concerns.",
  ],
  hat: [
    "Wearing hats is great for sun protection - keep doing it!",
    "Make sure to clean your face after wearing hats to prevent clogged pores.",
  ],
  earr: [
    "Keep earrings clean to prevent irritation and infection.",
    "Remove earrings before applying skincare products around the ear area.",
  ],
  neck: [
    "Don't forget to extend your skincare routine to your neck area.",
    "The neck shows signs of aging early - use anti-aging products here too.",
  ],
}

const YOLO_DETECTION_TIPS = {
  acne: [
    "Use gentle, non-comedogenic products to avoid further irritation.",
    "Consider salicylic acid or benzoyl peroxide for acne treatment.",
    "Don't pick at acne - this can lead to scarring and more breakouts.",
    "Maintain a consistent skincare routine and be patient with results.",
  ],
  age_spot: [
    "Use products with vitamin C, retinoids, or hydroquinone for age spots.",
    "Always wear sunscreen to prevent new age spots from forming.",
    "Consider professional treatments like chemical peels for stubborn spots.",
    "Be patient - age spot treatments can take several months to show results.",
  ],
  dark_spot: [
    "Look for products with niacinamide, kojic acid, or arbutin for dark spots.",
    "Consistent use of retinoids can help fade dark spots over time.",
    "Always use sunscreen to prevent dark spots from getting darker.",
    "Consider vitamin C serum in your morning routine for brightening.",
  ],
  wrinkle: [
    "Incorporate retinoids into your nighttime routine to reduce wrinkles.",
    "Use a good moisturizer to plump the skin and minimize fine lines.",
    "Consider products with peptides and hyaluronic acid for anti-aging.",
    "Don't forget sunscreen - it's the best anti-aging product you can use.",
  ],
  blackhead: [
    "Use salicylic acid products to help dissolve blackheads.",
    "Consider using pore strips occasionally, but don't overuse them.",
    "Oil cleansing can help dissolve the oil in blackheads.",
    "Regular gentle exfoliation can prevent blackheads from forming.",
  ],
  redness: [
    "Look for products with niacinamide or green tea to reduce redness.",
    "Avoid harsh ingredients that might increase irritation.",
    "Consider using a gentle, fragrance-free moisturizer.",
    "If redness persists, consult a dermatologist as it might be rosacea.",
  ],
  eye_bag: [
    "Use an eye cream with caffeine to help reduce puffiness.",
    "Get adequate sleep and stay hydrated to minimize eye bags.",
    "Consider using a cold compress in the morning to reduce swelling.",
    "Elevate your head while sleeping to prevent fluid accumulation.",
  ],
}

// Main function to generate tips based on analysis results
function generateTips(analysisData) {
  const tips = []

  // Add skin type tips
  if (analysisData.skin_type && SKIN_TYPE_TIPS[analysisData.skin_type]) {
    tips.push(...SKIN_TYPE_TIPS[analysisData.skin_type].slice(0, 2))
  }

  // Add eye color tips
  if (analysisData.left_eye_color && EYE_COLOR_TIPS[analysisData.left_eye_color]) {
    tips.push(...EYE_COLOR_TIPS[analysisData.left_eye_color].slice(0, 1))
  }
  if (
    analysisData.right_eye_color &&
    EYE_COLOR_TIPS[analysisData.right_eye_color] &&
    analysisData.right_eye_color !== analysisData.left_eye_color
  ) {
    tips.push(...EYE_COLOR_TIPS[analysisData.right_eye_color].slice(0, 1))
  }

  // Add acne severity tips
  if (analysisData.acne_pred !== undefined) {
    const acneLevel = Number.parseInt(analysisData.acne_pred) || 0
    if (ACNE_SEVERITY_TIPS[acneLevel]) {
      tips.push(...ACNE_SEVERITY_TIPS[acneLevel].slice(0, 2))
    }
  }

  // Add segmentation tips
  if (analysisData.segmentation_results && Array.isArray(analysisData.segmentation_results)) {
    const segmentationTips = []
    analysisData.segmentation_results.forEach((result) => {
      let segmentClass = ""
      if (typeof result === "string") {
        segmentClass = result
      } else if (result && typeof result === "object") {
        segmentClass = result.class || result.label || result.name || ""
      }

      if (segmentClass && SEGMENTATION_TIPS[segmentClass]) {
        segmentationTips.push(...SEGMENTATION_TIPS[segmentClass])
      }
    })

    // Add unique segmentation tips (limit to 2)
    const uniqueSegmentationTips = [...new Set(segmentationTips)]
    tips.push(...uniqueSegmentationTips.slice(0, 2))
  }

  // Add YOLO detection tips
  if (analysisData.yolo_boxes && Array.isArray(analysisData.yolo_boxes)) {
    const yoloTips = []
    analysisData.yolo_boxes.forEach((box) => {
      const detectionClass = box.label || box.class || ""
      if (detectionClass && YOLO_DETECTION_TIPS[detectionClass]) {
        yoloTips.push(...YOLO_DETECTION_TIPS[detectionClass])
      }
    })

    // Add unique YOLO tips (limit to 3)
    const uniqueYoloTips = [...new Set(yoloTips)]
    tips.push(...uniqueYoloTips.slice(0, 3))
  }

  // Remove duplicates and limit total tips
  const uniqueTips = [...new Set(tips)]
  return uniqueTips.slice(0, 8) // Limit to 8 tips maximum
}

// Export for use in other files (if using modules)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { generateTips }
}
