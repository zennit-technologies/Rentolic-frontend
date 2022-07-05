import React, { useState } from 'react'
import ItemsCarousel from 'react-items-carousel';
import './text.css'

const TextScreen = () => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    return (
        <>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="https://www.technocrazed.com/wp-content/uploads/2015/12/Landscape-wallpaper-33.jpg" alt="First slide" />
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Lorem ipsum dolor sit.</h5>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo, eius.</p>
                        </div>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>


            {/*  */}
            <div style={{ padding: `0 ${chevronWidth}px` }}>
                <ItemsCarousel
                    requestToChangeActive={setActiveItemIndex}
                    activeItemIndex={activeItemIndex}
                    numberOfCards={4}
                    gutter={20}
                    // leftChevron={<button>{'<'}</button>}
                    // rightChevron={<button>{'>'}</button>}
                    outsideChevron
                    chevronWidth={chevronWidth}
                >
                    <div style={{ height: 200, background: '#EEE' }}>First card</div>
                    <div style={{ height: 200, background: '#EEE' }}>Second card</div>
                    <div style={{ height: 200, background: '#EEE' }}>Third card</div>
                    <div style={{ height: 200, background: '#EEE' }}>Fourth card</div>
                </ItemsCarousel>
            </div>




            {/* BOOTSTRAP  */}
            <div className="container">
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="..." class="d-block w-25" alt="..." />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, facilis adipisci amet animi enim tenetur autem sapiente aliquid quam totam esse et quae eius natus repudiandae provident temporibus ad fugiat.</p>
                        </div>
                        <div class="carousel-item">
                            <img src="..." class="d-block w-25" alt="..." />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, facilis adipisci amet animi enim tenetur autem sapiente aliquid quam totam esse et quae eius natus repudiandae provident temporibus ad fugiat.</p>
                        </div>
                        <div class="carousel-item">
                            <img src="..." class="d-block w-25" alt="..." />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, facilis adipisci amet animi enim tenetur autem sapiente aliquid quam totam esse et quae eius natus repudiandae provident temporibus ad fugiat.</p>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>


            {/* NAVBAR */}
            <section class="navigation">
                <div class="nav-container">
                    <div class="brand">
                        <a href="#!">Logo</a>
                    </div>
                    <nav>
                        <div class="nav-mobile"><a id="nav-toggle" href="#!"><span></span></a></div>
                        <ul class="nav-list">
                            <li>
                                <a href="#!">Home</a>
                            </li>
                            <li>
                                <a href="#!">About</a>
                            </li>
                            <li>
                                <a href="#!">Services</a>
                                <ul class="nav-dropdown">
                                    <li>
                                        <a href="#!">Web Design</a>
                                    </li>
                                    <li>
                                        <a href="#!">Web Development</a>
                                    </li>
                                    <li>
                                        <a href="#!">Graphic Design</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#!">Pricing</a>
                            </li>
                            <li>
                                <a href="#!">Portfolio</a>
                                <ul class="nav-dropdown">
                                    <li>
                                        <a href="#!">Web Design</a>
                                    </li>
                                    <li>
                                        <a href="#!">Web Development</a>
                                    </li>
                                    <li>
                                        <a href="#!">Graphic Design</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#!">Contact</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>

            <article>
                <h2>Navigation</h2>
                <p>Responsive Dropdown Navigation Bar.</p>
                <p>Want to see how it's made? <a href="http://www.taniarascia.com/responsive-dropdown-navigation-bar/">Read the tutorial!</a></p>
            </article>



            {/*  */}
            <div class="carousel-wrap">
                <div class="owl-carousel">
                    <div class="item"><img src="http://placehold.it/150x150" /></div>
                    <div class="item"><img src="http://placehold.it/150x150" /></div>
                    <div class="item"><img src="http://placehold.it/150x150" /></div>
                    <div class="item"><img src="http://placehold.it/150x150" /></div>
                    <div class="item"><img src="http://placehold.it/150x150" /></div>
                    <div class="item"><img src="http://placehold.it/150x150" /></div>
                    <div class="item"><img src="http://placehold.it/150x150" /></div>
                    <div class="item"><img src="http://placehold.it/150x150" /></div>
                    <div class="item"><img src="http://placehold.it/150x150" /></div>
                    <div class="item"><img src="http://placehold.it/150x150" /></div>
                    <div class="item"><img src="http://placehold.it/150x150" /></div>
                    <div class="item"><img src="http://placehold.it/150x150" /></div>
                    <div class="item"><img src="http://placehold.it/150x150" /></div>
                    <div class="item"><img src="http://placehold.it/150x150" /></div>
                </div>
            </div>


            {/*  */}
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="https://www.omsignsinc.com/wp-content/uploads/2018/01/Banner-Signs-4.jpg" alt="First slide" />
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Lorem ipsum dolor sit.</h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, velit.</p>
                        </div>
                    </div>
                </div>
            </div>



            <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="..." alt="First slide"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="..." alt="Second slide"/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="..." alt="Third slide"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TextScreen