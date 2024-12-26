
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard, HomeLayout} from "./pages";
import Menu from "./components/Menu";
import { ToastContainer, toast } from 'react-toastify';
const router = createBrowserRouter([
  {
    
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        },
        
          {
            path: "menu",
            element: <Menu />,
            }
                ],
                },
                ]);
                console.log("rendered");
function App() {        
return (
    <>        
        <RouterProvider router={router} />
        <ToastContainer position='top-center' />
    </>
  )
}

export default App
