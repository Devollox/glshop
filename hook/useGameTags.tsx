const typeTags: { [key: string]: string } = {
  "game": 'Game',
  "rockstar": 'Rockstar',
  "steam": 'Steam',
  "nintendo": 'Nintendo',
  "dlc": 'DLC',
  "action": 'Action',
  "popular games": 'Popular Games',
  "pre-order": 'Pre-order',
  "new items": 'New Items',
  "subscription": 'Subscription',
  "adventure": 'Adventure',
  "2015": '2015',
  "ru+cis": 'RU+CIS',
};

const useTypeTag = (type: string | number) => {
  return typeTags[type];
}

export default useTypeTag;

