
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard} from "./pages";
import Menu from "./components/Menu";
import { ToastContainer} from 'react-toastify';
const router = createBrowserRouter([
  {
    
    path: "/",
    element: <Dashboard />,
    children: [
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
