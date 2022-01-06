import { ReactNode } from 'react';

export interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

function Modal({ isOpen, children, onClose }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
        css={{ fontSize: 0 }}
      >
        {/* background overlay */}
        <div
          className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block"
          aria-hidden="true"
        ></div>
        {/* This element is to trick the browser into centering the modal contents.  */}
        <span
          className="hidden md:inline-block md:align-middle md:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        {/* modal panel */}
        <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
          <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
            <button
              onClick={onClose}
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
              <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg"
                  alt="Two each of gray, white, and black shirts arranged on table."
                  className="object-center object-cover"
                />
              </div>
              <div className="sm:col-span-8 lg:col-span-7">
                <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
                  Basic Tee 6-Pack
                </h2>
                <section aria-labelledby="information-heading" className="mt-2">
                  <h3 id="information-heading" className="sr-only">
                    Product information
                  </h3>
                  <p className="text-2xl text-gray-900">$192</p>
                  {children}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
