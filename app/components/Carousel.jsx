"use client"
    import Carousel from "react-elastic-carousel";
    import styles from "../styles/Elastic.module.css";
    const breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 1, itemsToScroll: 2 },
      { width: 768, itemsToShow: 2 },
      { width: 1200, itemsToShow: 3 }
    ];
    export default function CarouselComponent() {
      const elastic =  [
          {
            "id": 1,
            "title": "Swiper Carousel Example",
            "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quos mollitia sed quod consectetur at quam dolore praesentium neque eos assumenda iusto nam laborum laboriosam odio blanditiis possimus accusantium recusandae porro exercitationem itaque",
            "imageUrl": "https://res.cloudinary.com/kizmelvin/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1597364662/kizmelvin/ussama-azam-hlg-ltdCoI0-unsplash_ttfjib.jpg"
          },
          {
            "id": 2,
            "title": "Swiper Carousel Example",
            "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quos mollitia sed quod consectetur at quam dolore praesentium neque eos assumenda iusto nam laborum laboriosam odio blanditiis possimus accusantium recusandae porro exercitationem itaque",
            "imageUrl": "https://res.cloudinary.com/kizmelvin/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1645530199/kizmelvin/Carousel%20assets/slim-emcee-jzdOX0XkXr8-unsplash_zocsdq.jpg"
          },
          {
            "id": 3,
            "title": "Swiper Carousel Example",
            "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quos mollitia sed quod consectetur at quam dolore praesentium neque eos assumenda iusto nam laborum laboriosam odio blanditiis possimus accusantium recusandae porro exercitationem itaque",
            "imageUrl": "https://res.cloudinary.com/kizmelvin/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1645534321/kizmelvin/Carousel%20assets/luwadlin-bosman-J1oObe7WWjk-unsplash_f56oh3.jpg"
          }
        ]
      return (
        <div className={styles.container}>
          <div>
            <h1>React Elastic Carousel Example</h1>
          </div>
          <hr className={styles.seperator} />
          <div className={styles.contWrapper}>
            <Carousel breakPoints={breakPoints}>
              {elastic.map((item) => (
                <div
                  key={item.id}
                  className={styles.card}
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                >
                  <div className={styles.title}>
                    <h3>{item.title} </h3>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      );
    }
