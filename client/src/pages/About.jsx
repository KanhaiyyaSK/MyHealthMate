import Navbar from "../components/Navbar";
import "../App.css";
import "./about.css";
import Footer from "../components/Footer";
import { Fade } from "react-awesome-reveal";
import { Card, Col } from "react-bootstrap";
import { AiFillGithub } from "react-icons/ai";
import { Link } from "react-router-dom";
import sk from "../assets/sk.png";
import pm from "../assets/piyush.png";
import mv from "../assets/maviya.png";
import { MdVerified } from "react-icons/md";

const About = () => {
  return (
    <>
      <Navbar buttons={true} />
      <div id="about-container" style={{ minHeight: "80vh" }}>
        <div id="about-left-container">
          <Fade
            delay={10}
            direction="top"
            style={{ color: "black" }}
            triggerOnce
          >
            <h2>About Us</h2>
          </Fade>

          <p id="about-text">
            We are a dedicated and enthusiastic team of student developers from
            Veermata Jijabai Technological Institute, Mumbai.MyHealthMate is a
            platform that empowers individuals to control their health and
            well-being. We believe that access to personalized healthcare
            information and resources should be available to everyone.
          </p>
        </div>

        <div className="d-flex about-right">
          <div>
            <Fade
              delay={100}
              damping={0.05}
              triggerOnce
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <div>
                <img src={sk} alt="about-pic" />
              </div>
              <p style={{ textAlign: "center" }}>Kanhaiyya Shendage</p>

              <a
                className="about-links"
                href="https://github.com/KanhaiyyaSK"
                style={{ textAlign: "center" }}
              >
                <AiFillGithub />
                KanhaiyyaSK
              </a>

              <p style={{ textAlign: "center" }}>Full Stack Developer</p>
            </Fade>
          </div>
          <div></div>
          <div>
            <Fade
              delay={100}
              damping={0.05}
              triggerOnce
              className="d-flex justify-content-center align-items-center flex-column "
            >
              <div>
                <img src={pm} alt="about-pic" />
              </div>
              <p style={{ textAlign: "center" }}>Piyush Motwani</p>

              <a
                className="about-links"
                href="https://github.com/Piyushmotwani"
                style={{ textAlign: "center" }}
              >
                <AiFillGithub />
                Piyushmotwani
              </a>

              <p style={{ textAlign: "center" }}>Full Stack Developer</p>
            </Fade>
          </div>

          <div></div>
          <div>
            <Fade
              delay={100}
              damping={0.05}
              triggerOnce
              className="d-flex justify-content-center align-items-center flex-column "
            >
              <div>
                <img src={mv} alt="about-pic" />
              </div>
              <p style={{ textAlign: "center" }}>Maviya Ali</p>

              <a
                className="about-links"
                href="https://github.com/maviyaali"
                style={{ textAlign: "center" }}
              >
                <AiFillGithub />
                maviyaali
              </a>

              <p style={{ textAlign: "center" }}>Full Stack Developer</p>
            </Fade>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
