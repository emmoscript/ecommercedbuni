import { removeFromCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";

import { RxCross1 } from "react-icons/rx";

interface propsType {
  id: string;
  img: string;
  title: string;
  price: number;
  quantity: number;
}

const CartProduct: React.FC<propsType> = ({
  id,
  img,
  title,
  price,
  quantity,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Image width={60} height={80} layout="intrinsic" src={img} alt={title} />
        <div className="text-left">
          <h3 className="font-medium text-base">{title}</h3>
          <p className="text-sm text-gray-500">
            {quantity} x ${price}
          </p>
        </div>
      </div>
      
       <RxCross1
        className="cursor-pointer"
        onClick={() => dispatch(removeFromCart(id))}
       />

    </div>
  );
};

export default CartProduct;
