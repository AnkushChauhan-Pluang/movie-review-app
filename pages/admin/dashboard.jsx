import Link from 'next/link';
import movieImg from 'public/movies.jpeg';
import profileImg from 'public/profile.png';
import reviewImg from 'public/please-leave-a-review.png';
import Image from 'next/image';
import { useAuthContext } from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Dashboard = () => {
  const { loginState } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loginState.user) router.replace('/');
  });
  return (
    <main className="m-4">
      <div className="mt-28 flex gap-6">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold">Movies</h2>
          <Link href="/admin/movies">
            <a>
              <Image
                src={movieImg}
                height={500}
                width={500}
                alt={'movies'}
                objectFit="cover"
              />
            </a>
          </Link>
        </div>
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold">Users</h2>
          <Link href="/admin/users">
            <a>
              <Image
                src={profileImg}
                height={500}
                width={500}
                alt={'users'}
                objectFit="cover"
              />
            </a>
          </Link>
        </div>
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold">Reviews</h2>
          <Link href="/admin/reviews">
            <a>
              <Image
                src={reviewImg}
                height={500}
                width={500}
                alt={'reviews'}
                objectFit="cover"
              />
            </a>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
