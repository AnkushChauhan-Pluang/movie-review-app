import { useAuthContext } from 'contexts/AuthContext';
import { useState } from 'react';
import Avatar from './Avatar';
import SideNavList from './SideNavList';

const ProfileLayout = ({ children }) => {
  const [avatar, setAvatar] = useState(null);
  const { loginState } = useAuthContext();
  const username = loginState.user && loginState.user.username;

  const onImageSelect = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      const url = reader.result.toString();
      // console.log(url);
      setAvatar(url);
    };
  };

  return (
    <div className="flex">
      <aside className="w-60 p-8">
        <div className="text-center">
          <label htmlFor="avatarUpload" className="cursor-pointer">
            <Avatar src={avatar} height="100" width="100" />
            <input
              type="file"
              hidden
              id="avatarUpload"
              onChange={onImageSelect}
            />
          </label>
          <div className="font-semibold">{username}</div>
        </div>
        <SideNavList />
      </aside>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default ProfileLayout;
