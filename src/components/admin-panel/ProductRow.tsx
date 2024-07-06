import { IProduct } from '@/app/admin/dashboard/page';
import { setLoading } from '@/redux/features/loadingSlice';
import { setProduct } from '@/redux/features/productSlice';
import { useAppDispatch } from '@/redux/hooks';
import { makeToast } from '@/utils/helpers';
import axios from 'axios';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react'
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin5Line } from 'react-icons/ri';


interface PropsType {
    srNo: number;
    setOpenPopup: Dispatch<SetStateAction<boolean>>;
    setUpdateTable: Dispatch<SetStateAction<boolean>>;
    product: IProduct
    
}

const ProductRow = ({srNo, setOpenPopup, setUpdateTable, product}: PropsType) => {
  
  const dispatch = useAppDispatch()

  const onEdit= () => {
    dispatch(setProduct(product))
    setOpenPopup(true)
  }

  const onDelete = () => {
    const payload = {
        fileKey: product.fileKey,
    };

    axios
        .delete("/api/uploadthing", {data: payload})
        .then((res) => {
            console.log(res);

            axios
                .delete(`/api/delete_product/${product._id}`)
                .then((res) => {
                    console.log(res);
                    makeToast("Product Detected Successfully!")
                    setUpdateTable((prevState) => !prevState);
                })
                .catch((err) => console.log(err))
                .finally(() => dispatch(setLoading(false)))
        })
        .catch((err) => console.log(err));

  }
  
    return (
    <tr>
        <td>
            <div>{srNo}</div>
        </td>
        <td>
            <div>{product.name}</div>
        </td>
        <td>
            <div>$ {product.price}</div>
        </td>
        <td className='py-2'>
            <Image 
                src={product.imgSrc} 
                width={40} 
                height={40} 
                alt="product_image"
            />
        </td>
        <td>
            <div className='text-2xl flex items-center gap-2 text-gray-600'>
                <div className='text-2xl flex items-center gap-2 text-gray-600'>
                    <CiEdit
                    className="cursor-pointer hover:text-black"
                    onClick={onEdit}
                    />
                    
                    <RiDeleteBin5Line
                    className="text-[20px] cursor-pointer hover:text-red-600"
                    onClick={onDelete}
                    />
                </div>
            </div>
        </td>
    </tr>
  )
}

export default ProductRow