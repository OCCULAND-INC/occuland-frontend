import Sidebar from '~/components/global/SideBar/Sidebar';

function Home() {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <main className="grow">main area</main>
    </div>
  );
}

export default Home;
