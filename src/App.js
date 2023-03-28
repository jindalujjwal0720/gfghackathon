import "./App.css";
import { SideBar } from "./presentation/components/SideBar/SideBar";
import { Header } from "./presentation/components/Header/Header";
import { Footer } from "./presentation/components/Footer/Footer";
import { Content } from "./presentation/components/Content/Content";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div className="ContentWrapper">
        <div>
          <Header />
          <Content />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
