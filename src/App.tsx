import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProductsPage from './pages/Outlet/ProductsHome/ProductsPage'
import ProductDetail from './pages/Outlet/ProductsHome/ProductDetail'
import { useEffect, useState } from 'react'
import { addProduct, getAllProducts, removeProducts, updateProducts } from './api/products'
import Signin from './pages/Outlet/Account/Signin'
import Signup from './pages/Outlet/Account/Signup'
import AdminPage from './pages/admin/AdminPage'
import AddProduct from './pages/admin/Products/AddProduct'
import UpdateProduct from './pages/admin/Products/UpdateProduct'
import { getAllCategory } from './api/category'
import Home from './pages/Outlet/Home'
import { addUser, getAllUsers } from './api/users'
import { IUser } from './type/users'
import ProductsManagement from './pages/admin/Products/ProductsManagement'
import UsersManagement from './pages/admin/Users/UsersManagement'
import AddUser from './pages/admin/Users/AddUser'
import UpdateUser from './pages/admin/Users/UpdateUser'
import CategoryManagement from './pages/admin/Category/CategoryManagement'
import AddCategory from './pages/admin/Category/AddCategory'
import UpdateCategory from './pages/admin/Category/UpdateCategory'
import { IProducts } from './type/products'

function App() {
  // Products
  const [products, setProducts] = useState([])
  useEffect(() => {
    getAllProducts().then(({ data }) => setProducts(data))
  }, [])

  // Category
  const [category, setCategory] = useState([])
  useEffect(() => {
    getAllCategory().then(({ data }) => setCategory(data))
  }, [])

  // Users
  const [users, setUsers] = useState([])
  useEffect(() => {
    getAllUsers().then(({ data }) => setUsers(data))
  }, [])

  // Current User
  const [currentUser, setCurrentUser] = useState(null)
  const onHandleSignIn = () => {
    useEffect(() => {
      const userJson = localStorage.getItem('user');
      // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
      // const user = JSON.parse(localStorage.getItem(user));
      // Truy cập thuộc tính "role" và lưu giữ giá trị trong biến role
      // const role = user.role;
      // setCurrentUser(role)
      // console.log(role);
    }, [])
  }
  // console.log('user', currentUser.role);

  // Add User
  const onHandleSignUp = (account: IUser) => {
    addUser(account)
  }

  // Remove Products
  const onHandleRemove = (id: number) => {
    removeProducts(id).then(() => setProducts(products.filter((item: IProducts) => item.id !== +id)))
  }
  // Add Products
  const onHandleAdd = (product: IProducts) => {
    addProduct(product).then(() => {
      getAllProducts().then(({ data }) => setProducts(data))
    })
  }
  // Update Product
  const onHandleUpdate = (product: IProducts) => {
    updateProducts(product).then(() => {
      getAllProducts().then(({ data }) => setProducts(data))
    })
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} >
          {/* <Route index element={<Home />} /> */}
          {/* {products && category && ( */}
          <Route path='products' >
            <Route index element={<ProductsPage products={products} category={category} />} />
            <Route path=':id' element={<ProductDetail products={products} category={category} />} />
          </Route>
          {/* // )} */}
          <Route path='signin' element={<Signin users={users} onSignIn={onHandleSignIn} />} />
          <Route path='signup' element={<Signup users={users} onSignUp={onHandleSignUp} />} />
        </Route>
        {/* {currentUser == 1 && ( */}
        <Route path='/admin/*' element={<AdminPage />} >
          {/* <Route index element={<AdminPage />} /> */}
          <Route path='products'>
            <Route index element={<ProductsManagement products={products} onRemove={onHandleRemove} />} />
            <Route path='add' element={<AddProduct onAdd={onHandleAdd} category={category} />} />
            <Route path=':id/update' element={<UpdateProduct onUpdate={onHandleUpdate} products={products} category={category} />} />
          </Route>
          <Route path='users'>
            <Route index element={<UsersManagement />} />
            <Route path='add' element={<AddUser />} />
            <Route path='update' element={<UpdateUser />} />
          </Route>
          <Route path='categories'>
            <Route index element={<CategoryManagement />} />
            <Route path='add' element={<AddCategory />} />
            <Route path='update' element={<UpdateCategory />} />
          </Route>
        </Route>
        {/* )} */}
        {/* {currentUser !== 1 && (
          <Route path='/admin/*' element={<Navigate to='/' />} />
        )} */}
      </Routes>
    </div>
  )
}

export default App
