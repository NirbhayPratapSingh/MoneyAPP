import Navbar from "./components/Navbar/Navbar";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <div style={{marginTop:"70px", marginBottom:"70px"}}>
      <Navbar/>
      <MainRoutes/>
    </div>
  );
}

export default App;
