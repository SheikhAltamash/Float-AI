import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import ScrollProgressBar from "./ScrollBar";
import UseCases from "./UseCases";
import Workflow from "./Workflow";

export default function Home() {
    return <div className="home">
        <ScrollProgressBar></ScrollProgressBar>
        <Header></Header>
        <Hero></Hero>
        <Features></Features>
        <UseCases></UseCases>
        <Workflow></Workflow>
        <Footer></Footer>    
   </div>
}