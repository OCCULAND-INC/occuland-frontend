import Button from '~/components/global/Button/Button';
import Modal, { ModalProps } from '~/components/global/Modal/Modal';

interface Coords extends ModalProps {
  x: string;
  y: string;
}

type Props = Omit<Coords, 'children'>;

function LandDetailModal({ isOpen, onClose, x, y }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-8 lg:col-span-12">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
            Contract Detail
          </h2>
          <section aria-labelledby="information-heading" className="mt-2">
            <h3 id="information-heading" className="sr-only">
              Product information
            </h3>
            <table>
              <tr>
                <th>Land Coordinates: </th>
                <td className="pl-5">
                  {x},{y}
                </td>
              </tr>
              <tr>
                <th>Time in: </th>
                <td className="pl-5">December 20, 2021</td>
              </tr>
              <tr>
                <th>Time out:</th>
                <td className="pl-5">Decemeber 22, 2021</td>
              </tr>
              <tr>
                <th>Number of days:</th>
                <td className="pl-5">4</td>
              </tr>
            </table>

            <table className="mt-5">
              <tr>
                <th>Security Deposit:</th>
                <td className="pl-5">200 MANA</td>
              </tr>
              <tr>
                <th>Daily Rate:</th>
                <td className="pl-5">200 MANA</td>
              </tr>
              <tr>
                <th>Transfer Fee:</th>
                <td className="pl-5">$30.00</td>
              </tr>
            </table>
          </section>
          <div className="flex justify-center mt-5">
            <Button>Pay Now</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default LandDetailModal;
