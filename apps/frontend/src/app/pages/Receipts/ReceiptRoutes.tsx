import { Route, Routes } from 'react-router-dom';
import { ReceiptDetail } from './ReceiptDetail';
import { Receipts } from './Receipts';

export const ReceiptsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Receipts />}></Route>
      <Route path=":id" element={<ReceiptDetail />} />
    </Routes>
  );
};
