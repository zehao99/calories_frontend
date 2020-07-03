import React from "react";
import SimpleBarcode from '../../components/barcode'
// const SimpleBarcode = dynamic(
//   () => import('../../components/barcode'),
//   {ssr: false}
// )
export default function Test() {
  return  <SimpleBarcode
    height={40}
    width={2}
    label={"035493015262"}
  />
}