import React from 'react';
import './faq.style.css';
import { Accordion, Card } from 'react-bootstrap';


const Faq = () => {

    return (
        <>
            <div className="faq-main-container">
                <div className="faq-title">
                    Frequently Asked Questions
                </div>

                <div className="questions-container">
                    <Accordion>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">Where our products come from?</Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>Our jewelry comes directly from the East in collaboration and work with talented people who bring us the highest quality products.</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">What are our jewelry made of?</Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>We have 3 types of materials:
                                    <div>Brass - a gold substance composed of copper and zinc.</div>
                                    <div>Silver coating - coating of 2 micro on top of the brass material.</div>
                                    <div>Silver 925 - is an alloy of silver containing 92.5% by weight of silver and 7.5% by weight of other metals.</div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="2">Is it recommended to use our jewelry in regular use with water?</Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>In jewelry with a silver plating it is not recommended to make regular use with water.</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="3">What kind of Gemstone do you have?</Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body>Most of our stones are real Gemstone coming straight from India: Black Onyx, Moonstone, Labradorite, Lapis lazuli, Amethyst and more...</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="4">What is the best way to contact you?</Accordion.Toggle>
                            <Accordion.Collapse eventKey="4">
                                <Card.Body>The best way to contact is is via Facebook messenger or our Instagram.</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </div>
        </>
    )
}

export default Faq;