import Button from '~/components/global/Button/Button';
import Input from '~/components/global/Input/Input';

function HomeContainer() {
  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-5">Explore the Metaverse</h1>
      <form className="flex">
        <Input type="password" className="h-10 mr-5" placeholder="Platform" />
        <Button className="mr-5">Land market</Button>
        <Button>Experience</Button>
      </form>
    </div>
  );
}

export default HomeContainer;
