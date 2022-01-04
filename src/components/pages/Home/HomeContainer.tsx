import Button from '~/components/global/Button/Button';

function HomeContainer() {
  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl">Explore the Metaverse</h1>
      <div>
        <select className="mr-5">
          <option>Platform1</option>
          <option>Platform2</option>
          <option>Platform3</option>
        </select>
        <Button className="mr-5">Land market</Button>
        <Button>Experience</Button>
      </div>
    </div>
  );
}

export default HomeContainer;
