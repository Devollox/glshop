import PageCatalog from "@/pages/catalog/pagecatalog";
import response from "../../public/games/all_shop.json"; // Импорт JSON с установленными декларациями

interface Game {
  id: number;
  name: string;
  slug: string;
}

interface Props {
  catalog?: Game | null;
}

interface Context {
  query: {
    slug: string;
  };
}

export const getServerSideProps = (context: Context) => {
  const { slug } = context.query;

  const foundGame = response.data.find((game: Game) => game.slug === slug);

  return {
    props: { catalog: foundGame || null },
  };
};

const SlugContent: React.FC<Props> = ({ catalog }) => {
  return <PageCatalog catalog={catalog} />;
};

export default SlugContent;