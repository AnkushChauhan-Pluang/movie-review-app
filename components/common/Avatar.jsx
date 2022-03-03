import Image from 'next/image';
import avatar from 'public/avatar.jpg';

const Avatar = ({ src, height = '30', width = '30' }) => {
  return (
    <Image
      alt="user avatar"
      src={src || avatar}
      className="rounded-full"
      height={height}
      width={width}
      objectFit="contain"
    />
  );
};

export default Avatar;
