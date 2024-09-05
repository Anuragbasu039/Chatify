const generateDiceBearAvataaars = (seed) =>
  // `https://avatars.dicebear.com/api/avataaars/${seed}.svg`;
`https://api.dicebear.com/9.x/pixel-art/svg`

const generateDiceBearBottts = (seed) =>
  // `https://avatars.dicebear.com/api/bottts/${seed}.svg`;
`https://api.dicebear.com/9.x/bottts/webp`

const generateDiceBearGridy = (seed) =>
  // `https://avatars.dicebear.com/api/gridy/${seed}.svg`;
`https://api.dicebear.com/9.x/personas/svg`
const generateAvatarNeural = (seed) =>
 `https://api.dicebear.com/9.x/adventurer-neutral/svg`
const generateAvatar1 = (seed) =>
  `https://api.dicebear.com/9.x/open-peeps/svg`;
const generateAvatar2 = (seed) =>
  `https://api.dicebear.com/9.x/big-ears/svg`;
export const generateAvatar = () => {
  const data = [];

  for (let i = 0; i < 1; i++) {
    const res = generateDiceBearAvataaars(Math.random());
    data.push(res);
  }
  for (let i = 0; i < 1; i++) {
    const res = generateDiceBearBottts(Math.random());
    data.push(res);
  }
  for (let i = 0; i < 1; i++) {
    const res = generateDiceBearGridy(Math.random());
    data.push(res);
  }
  for (let i = 0; i < 1; i++) {
    const res = generateAvatarNeural(Math.random());
    data.push(res);
  }
  for (let i = 0; i < 1; i++) {
    const res = generateAvatar1(Math.random());
    data.push(res);
  }
  for (let i = 0; i < 1; i++) {
    const res = generateAvatar2(Math.random());
    data.push(res);
  }
  return data;
};
