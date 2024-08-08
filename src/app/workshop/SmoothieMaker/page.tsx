"use client"

import { useState } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/front-end/Navbar";
import Cart from "@/components/front-end/Cart";

interface SmoothieItem {
  name: string;
  price: number;
}

interface IngredientsState {
  fruits: SmoothieItem | null;
  vegetables: SmoothieItem | null;
  extras: SmoothieItem | null;
}

interface AdditionalIngredientsState {
  fruits: SmoothieItem[];
  vegetables: SmoothieItem[];
  extras: SmoothieItem[];
}

const initialIngredientsState: IngredientsState = {
  fruits: null,
  vegetables: null,
  extras: null,
}

const initialAdditionalIngredientsState: AdditionalIngredientsState = {
  fruits: [],
  vegetables: [],
  extras: [],
}

const fruits: SmoothieItem[] = [
  { name: "Banana", price: 1.5 },
  { name: "Strawberry", price: 2 },
  { name: "Mango", price: 2.5 },
  { name: "Pineapple", price: 3 },
  { name: "Blueberry", price: 2.25 },
]

const vegetables: SmoothieItem[] = [
  { name: "Spinach", price: 1 },
  { name: "Kale", price: 1.25 },
  { name: "Carrot", price: 0.75 },
  { name: "Cucumber", price: 0.5 },
  { name: "Celery", price: 0.75 },
]

const extras: SmoothieItem[] = [
  { name: "Protein Powder", price: 2.5 },
  { name: "Chia Seeds", price: 2 },
  { name: "Flaxseeds", price: 1.5 },
  { name: "Honey", price: 1.75 },
  { name: "Almond Milk", price: 2.25 },
]

export default function CreateShake() {
  const [ingredients, setIngredients] = useState<IngredientsState>(initialIngredientsState)
  const [additionalIngredients, setAdditionalIngredients] = useState<AdditionalIngredientsState>(initialAdditionalIngredientsState)
  const [totalPrice, setTotalPrice] = useState(5.0)
  const [showMoreIngredients, setShowMoreIngredients] = useState(false)

  const handleIngredientSelect = (type: keyof IngredientsState, item: SmoothieItem) => {
    setIngredients((prevState) => {
      const updatedIngredients = { ...prevState, [type]: item }
      setShowMoreIngredients(true)
      return updatedIngredients
    })
    updateTotalPrice()
  }

  const handleAdditionalIngredientSelect = (type: keyof AdditionalIngredientsState, item: SmoothieItem) => {
    setAdditionalIngredients((prevState) => {
      const updatedAdditionalIngredients = { ...prevState }
      updatedAdditionalIngredients[type] = [...updatedAdditionalIngredients[type], item]
      setShowMoreIngredients(true)
      return updatedAdditionalIngredients
    })
    updateTotalPrice()
  }

  const updateTotalPrice = () => {
    const total =
      5.0 +
      (ingredients.fruits?.price || 0) +
      (ingredients.vegetables?.price || 0) +
      (ingredients.extras?.price || 0) +
      additionalIngredients.fruits.reduce((acc, fruit) => acc + fruit.price, 0) +
      additionalIngredients.vegetables.reduce((acc, vegetable) => acc + vegetable.price, 0) +
      additionalIngredients.extras.reduce((acc, extra) => acc + extra.price, 0)
    setTotalPrice(total)
  }
  
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <Navbar setShowCart={setShowCart} />
      {showCart && <Cart setShowCart={setShowCart} />}
      <div className="flex justify-center p-6">
        <div className="bg-gray-100 px-4 py-6 rounded-lg w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold text-[#9554fe]">Your Smoothie</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <IngredientDropdown
                  label={ingredients.fruits?.name || "Fruits"}
                  items={fruits}
                  selectedItem={ingredients.fruits}
                  onSelect={(item) => handleIngredientSelect("fruits", item)}
                />
                <IngredientDropdown
                  label={ingredients.vegetables?.name || "Vegetables"}
                  items={vegetables}
                  selectedItem={ingredients.vegetables}
                  onSelect={(item) => handleIngredientSelect("vegetables", item)}
                />
                <IngredientDropdown
                  label={ingredients.extras?.name || "Extras"}
                  items={extras}
                  selectedItem={ingredients.extras}
                  onSelect={(item) => handleIngredientSelect("extras", item)}
                />
              </div>
              {showMoreIngredients && (
                <div className="grid md:grid-cols-3 gap-4">
                  <AdditionalIngredientDropdown
                    label="Additional Fruits"
                    items={fruits}
                    selectedItems={additionalIngredients.fruits}
                    onSelect={(item) => handleAdditionalIngredientSelect("fruits", item)}
                  />
                  <AdditionalIngredientDropdown
                    label="Additional Vegetables"
                    items={vegetables}
                    selectedItems={additionalIngredients.vegetables}
                    onSelect={(item) => handleAdditionalIngredientSelect("vegetables", item)}
                  />
                  <AdditionalIngredientDropdown
                    label="Additional Extras"
                    items={extras}
                    selectedItems={additionalIngredients.extras}
                    onSelect={(item) => handleAdditionalIngredientSelect("extras", item)}
                  />
                </div>
              )}
              <SelectedIngredients ingredients={ingredients} additionalIngredients={additionalIngredients} />
            </div>
            <Receipt ingredients={ingredients} additionalIngredients={additionalIngredients} totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </>
  )
}

interface IngredientDropdownProps {
  label: string;
  items: SmoothieItem[];
  selectedItem: SmoothieItem | null;
  onSelect: (item: SmoothieItem) => void;
}

const IngredientDropdown: React.FC<IngredientDropdownProps> = ({ label, items, selectedItem, onSelect }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="w-full border-[#9554fe] text-[#9554fe] hover:bg-[#9554fe] hover:text-white">
        {label}
        <ChevronDownIcon className="ml-auto h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-full">
      {items.map((item) => (
        <DropdownMenuItem
          key={item.name}
          onSelect={() => onSelect(item)}
          className={`flex justify-between ${selectedItem?.name === item.name ? "bg-[#9554fe] text-white" : ""}`}
        >
          {item.name}
          <span>${item.price.toFixed(2)}</span>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
)

interface AdditionalIngredientDropdownProps {
  label: string;
  items: SmoothieItem[];
  selectedItems: SmoothieItem[];
  onSelect: (item: SmoothieItem) => void;
}

const AdditionalIngredientDropdown: React.FC<AdditionalIngredientDropdownProps> = ({ label, items, selectedItems, onSelect }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="w-full border-[#9554fe] text-[#9554fe] hover:bg-[#9554fe] hover:text-white">
        {label}
        <ChevronDownIcon className="ml-auto h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-full">
      {items.map((item) => (
        <DropdownMenuItem
          key={item.name}
          onSelect={() => onSelect(item)}
          className={`flex justify-between ${selectedItems.some((i) => i.name === item.name) ? "bg-[#9554fe] text-white" : ""}`}
        >
          {item.name}
          <span>${item.price.toFixed(2)}</span>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
)

interface SelectedIngredientsProps {
  ingredients: IngredientsState;
  additionalIngredients: AdditionalIngredientsState;
}

const SelectedIngredients: React.FC<SelectedIngredientsProps> = ({ ingredients, additionalIngredients }) => (
  <div className="grid gap-4">
    <IngredientList title="Fruits" items={ingredients.fruits ? [ingredients.fruits] : []} />
    <IngredientList title="Vegetables" items={ingredients.vegetables ? [ingredients.vegetables] : []} />
    <IngredientList title="Extras" items={ingredients.extras ? [ingredients.extras] : []} />
    <IngredientList title="Additional Fruits" items={additionalIngredients.fruits} />
    <IngredientList title="Additional Vegetables" items={additionalIngredients.vegetables} />
    <IngredientList title="Additional Extras" items={additionalIngredients.extras} />
  </div>
)

interface IngredientListProps {
  title: string;
  items: SmoothieItem[];
}

const IngredientList: React.FC<IngredientListProps> = ({ title, items }) => (
  items.length > 0 && (
    <div>
      <h3 className="text-lg font-medium text-[#1385fc]">{title}</h3>
      <ul className="grid gap-2">
        {items.map((item) => (
          <li key={item.name} className="flex justify-between items-center text-gray-800">
            {item.name}
            <span>${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
)

interface ReceiptProps {
  ingredients: IngredientsState;
  additionalIngredients: AdditionalIngredientsState;
  totalPrice: number;
}

const Receipt: React.FC<ReceiptProps> = ({ ingredients, additionalIngredients, totalPrice }) => (
  <div className="bg-gray-300 shadow-xl rounded-lg p-6 sticky top-8 h-full">
    <h2 className="text-2xl font-bold text-[#9554fe] mb-4">Receipt</h2>
    <div className="grid gap-4">
      <IngredientList title="Fruits" items={ingredients.fruits ? [ingredients.fruits] : []} />
      <IngredientList title="Vegetables" items={ingredients.vegetables ? [ingredients.vegetables] : []} />
      <IngredientList title="Extras" items={ingredients.extras ? [ingredients.extras] : []} />
      <IngredientList title="Additional Fruits" items={additionalIngredients.fruits} />
      <IngredientList title="Additional Vegetables" items={additionalIngredients.vegetables} />
      <IngredientList title="Additional Extras" items={additionalIngredients.extras} />
      <div className="flex justify-between items-center text-[#1385fc]">
        <span>Total:</span>
        <span className="font-bold">${totalPrice.toFixed(2)}</span>
      </div>
      <Button className="w-full bg-[#9554fe] text-white hover:bg-[#7e39fd]">Place Order</Button>
    </div>
  </div>
)

const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M10 12l-4-4h8l-4 4z"
      clipRule="evenodd"
    />
  </svg>
)

