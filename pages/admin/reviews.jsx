import { useAuthContext } from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Dashboard = ({ reviews }) => {
  const { loginState } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loginState.user) router.replace('/');
  });

  // console.log(reviews);
  const headers = [
    { key: 'id', title: 'S. No.' },
    { key: 'movieId', title: 'Movie Id' },
    { key: 'username', title: 'Reviewer' },
    { key: 'review', title: 'Review' },
  ];

  return (
    <main className="m-4">
      <h1 className="mb-2 text-2xl font-medium">Movie Review App reviews</h1>
      <div className="overflow-hidden rounded border shadow-md">
        <table className="min-w-full divide-y">
          <thead className="bg-neutral-100">
            <tr>
              {headers.map(({ key, title }) => (
                <th
                  key={key}
                  className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-neutral-500"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {reviews &&
              reviews.map((item, i) => (
                <tr key={item._id} className="hover:bg-neutral-50">
                  <td className="px-3 py-2">{i + 1}</td>
                  <td className="px-3 py-2">{item.movieId}</td>
                  <td className="px-3 py-2">{item.username}</td>
                  <td className="px-3 py-2">{item.review}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {!reviews.length > 0 && (
          <div className="p-10 text-center">No data found</div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;

export const getServerSideProps = () => {
  return fetch('http://localhost:3000/api/reviews')
    .then((res) => res.json())
    .then((data) => {
      return { props: { reviews: data } };
    });
};
