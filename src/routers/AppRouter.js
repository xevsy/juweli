import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import FrontPage from '../components/pages/FrontPage'
import Dashboard from '../components/cabinet/Dashboard'
import AddItem from '../components/cabinet/AddItem'
import EditItem from '../components/cabinet/EditItem'
import NotFoundPage from '../components/pages/NotFoundPage'
import AddCategory from '../components/cabinet/AddCategory'
import BucketPage from '../components/pages/BucketPage'
import PrivateRoute from './PrivateRoute'
import AddTag from '../components/cabinet/AddTag'

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path={"/"} component={FrontPage} exact={true} />
        <Route path={"/bucket"} component={BucketPage} exact={true} />
        <PrivateRoute path={"/cabinet"} component={Dashboard} exact={true}/>
        <PrivateRoute path={"/cabinet/newCategory"} component={AddCategory} />
        <PrivateRoute path={"/cabinet/newTag"} component={AddTag} />
        <PrivateRoute path={"/cabinet/newProduct"} component={AddItem} />
        <PrivateRoute path={"/cabinet/edit/:id"} component={EditItem} />
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
