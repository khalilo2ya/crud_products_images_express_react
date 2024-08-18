
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/add' element={<AddProduct />} />
        <Route path='/edit/:id' element={<EditProduct />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
