import PageTags from "./pagetags";
import response from "../../../public/games/all_shop.json";

interface Props {
  catalog?: any;
  slugContext?: string;
}

interface Context {
  query: {
    slug: string;
  };
}

export const getServerSideProps = (context: Context) => {
  const {slug} = context.query;

  const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const capitalizeFirstTwoWords = (str: string) => {
    const words = str.split(' ');
    if (words.length === 1) {
      return capitalizeFirstLetter(str);
    }
    return words.map((word, index) => index < 2 ? capitalizeFirstLetter(word) : word.toLowerCase()).join(' ');
  };

  const toUpperCase = (str: string) => str.toUpperCase();

  const checkTagMatch = (tagName: string, slug: string) => {
    const capitalizedSlug = capitalizeFirstLetter(slug);
    const capitalizedFirstTwoWordsSlug = capitalizeFirstTwoWords(slug);
    const upperCaseSlug = toUpperCase(slug);

    return tagName === capitalizedSlug || tagName === capitalizedFirstTwoWordsSlug || tagName === upperCaseSlug;
  };

  interface Tag {
    en_name: string;
  }

  interface Game {
    tags: Tag[];
  }

  let foundGame = response.data.filter((game: Game) =>
    game.tags.some((tag) => checkTagMatch(tag.en_name, slug))
  );

  return {
    props: {
      catalog: foundGame,
      slugContext: slug
    },
  };
};

const SlugContent: React.FC<Props> = ({ catalog, slugContext }) => {
  return <PageTags catalog={catalog} slugContext={slugContext}/>
};

export default SlugContent;