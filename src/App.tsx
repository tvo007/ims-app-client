import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { Login, Dash, Products, AddProducts } from "./pages";
import Layout from "./components/common/Layout";
import Alert from "./features/alert/Alert";
import theme from "./theme.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: "#F9FAFC" }}>
        <Alert />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/create" element={<AddProducts />} />
            <Route path="/dash" element={<Dash />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
