import Image from "next/image";

export default async function HairStylesIdPage(props) {
    return <>
        <section>
            <h1>Fade in</h1>
            
            <Image
            src="/imgs/general-img-square.png"
            alt="Picture of the author"
            width={500}
            height={500}
            />

            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus placeat voluptas, perferendis quaerat illum quis aliquam, harum consequatur minima magnam eligendi, ratione repudiandae fugiat. Neque consequuntur veritatis id ipsum expedita.</p>

            <button>Tag 1</button>
            <button>Tag 1</button>
            <button>Tag 1</button>
            <button>Tag 1</button>
        </section>
    </>;
}
