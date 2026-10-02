import React from 'react';
import { FoodPreferences, ValidationErrors } from '../../types/questionnaire';
import { SectionHeader } from '../common/SectionHeader';
import { TextQuestion } from '../common/TextQuestion';
import { TextareaQuestion } from '../common/TextareaQuestion';
import { NavigationButtons } from '../common/NavigationButtons';

interface FoodPreferencesSectionProps {
  data: FoodPreferences;
  onChange: (fields: Partial<FoodPreferences>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSave?: () => void;
  errors: ValidationErrors;
}

export const FoodPreferencesSection: React.FC<FoodPreferencesSectionProps> = ({
  data,
  onChange,
  onNext,
  onPrev,
  onSave,
  errors,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fadeIn">
      <SectionHeader
        badge="Section 2 • Flavors & Treats"
        title="The Way To Your Heart Might Be Through Food 😋"
        subtitle="So I never have to guess what treats to order or what to bring when you are hungry."
      />

      <div className="space-y-6">
        {/* Favorite Food (Required) */}
        <TextQuestion
          id="favoriteFood"
          title="What is your ultimate favorite food?"
          icon="🍕"
          description="The one meal that never lets you down."
          placeholder="e.g., Crispy Masala Dosa, Truffle Pasta, Sushi, Biryani"
          value={data.favoriteFood}
          onChange={(val) => onChange({ favoriteFood: val })}
          required
          maxLength={100}
          error={errors.favoriteFood}
        />

        {/* 2-Column Grid for Delicacies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextQuestion
            id="favoriteIndianFood"
            title="Favorite Indian food?"
            icon="🍛"
            placeholder="e.g., Paneer Butter Masala, Butter Chicken"
            value={data.favoriteIndianFood}
            onChange={(val) => onChange({ favoriteIndianFood: val })}
          />

          <TextQuestion
            id="favoriteSouthIndianFood"
            title="Favorite South Indian food?"
            icon="🥞"
            placeholder="e.g., Ghee Roast Dosa, Idli Vada, Appam"
            value={data.favoriteSouthIndianFood}
            onChange={(val) => onChange({ favoriteSouthIndianFood: val })}
          />

          <TextQuestion
            id="favoriteSnack"
            title="Favorite snack?"
            icon="🍿"
            placeholder="e.g., Peri-peri fries, Nachos, Caramel Popcorn"
            value={data.favoriteSnack}
            onChange={(val) => onChange({ favoriteSnack: val })}
          />

          <TextQuestion
            id="favoriteChocolate"
            title="Favorite chocolate?"
            icon="🍫"
            placeholder="e.g., Ferrero Rocher, Lindt Sea Salt, Dairy Milk Silk"
            value={data.favoriteChocolate}
            onChange={(val) => onChange({ favoriteChocolate: val })}
          />

          <TextQuestion
            id="favoriteIceCream"
            title="Favorite ice cream flavor?"
            icon="🍨"
            placeholder="e.g., Belgian Chocolate, Pistachio, Tender Coconut"
            value={data.favoriteIceCream}
            onChange={(val) => onChange({ favoriteIceCream: val })}
          />

          <TextQuestion
            id="favoriteFruit"
            title="Favorite fruit?"
            icon="🍓"
            placeholder="e.g., Sweet Strawberries, Alphonso Mango, Kiwi"
            value={data.favoriteFruit}
            onChange={(val) => onChange({ favoriteFruit: val })}
          />

          <TextQuestion
            id="favoriteDrink"
            title="Favorite drink or beverage?"
            icon="🧋"
            placeholder="e.g., Iced Caramel Macchiato, Peach Iced Tea, Boba"
            value={data.favoriteDrink}
            onChange={(val) => onChange({ favoriteDrink: val })}
          />

          <TextQuestion
            id="favoriteFastFood"
            title="Favorite fast food guilty pleasure?"
            icon="🍔"
            placeholder="e.g., Thin-crust woodfired pizza, crispy burgers"
            value={data.favoriteFastFood}
            onChange={(val) => onChange({ favoriteFastFood: val })}
          />

          <TextQuestion
            id="favoriteRestaurant"
            title="Favorite cafe or restaurant?"
            icon="🍽️"
            placeholder="e.g., Cozy rooftop Italian, local aesthetic bakery"
            value={data.favoriteRestaurant}
            onChange={(val) => onChange({ favoriteRestaurant: val })}
          />

          <TextQuestion
            id="favoriteDessert"
            title="Favorite dessert?"
            icon="🍰"
            placeholder="e.g., Warm brownie with gelato, Tiramisu, Cheesecake"
            value={data.favoriteDessert}
            onChange={(val) => onChange({ favoriteDessert: val })}
          />
        </div>

        {/* Comfort food you could eat anytime */}
        <TextQuestion
          id="eatAnytime"
          title="What food could you eat anytime, anywhere?"
          icon="🥣"
          description="Your ultimate warm comfort food on an exhausting day."
          placeholder="e.g., Warm ramen, home-style curd rice, toasted cheese sandwiches"
          value={data.eatAnytime}
          onChange={(val) => onChange({ eatAnytime: val })}
        />

        {/* Disliked food */}
        <TextQuestion
          id="dislikedFood"
          title="Food you absolutely dislike or cannot stand?"
          icon="🙅‍♀️"
          description="Foods I will make sure never end up on your plate."
          placeholder="e.g., Bitter gourd, mushrooms, raw onions, mayonnaise"
          value={data.dislikedFood}
          onChange={(val) => onChange({ dislikedFood: val })}
        />

        {/* Allergies / foods to avoid */}
        <TextareaQuestion
          id="allergiesOrAvoid"
          title="Any food allergies, dietary restrictions, or foods I should avoid buying for you?"
          icon="🛡️"
          description="Completely optional. Just so I always keep you safe and healthy."
          placeholder="e.g., Mild lactose intolerance (prefer oat milk!), peanut allergy, strictly vegetarian, etc."
          value={data.allergiesOrAvoid}
          onChange={(val) => onChange({ allergiesOrAvoid: val })}
          maxLength={500}
          rows={2}
          error={errors.allergiesOrAvoid}
        />
      </div>

      <NavigationButtons
        onNext={onNext}
        onPrev={onPrev}
        onSave={onSave}
        canPrev={true}
        nextLabel="Daily Habits 🌷"
      />
    </div>
  );
};
