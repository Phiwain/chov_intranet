import Link from "next/link";
import Image from "next/image";


const LeftMenu = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-2">
        <Link
          href="pulsy.fr"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/pulsy.png" alt="" width={35} height={35} className="rounded-md" />
          <span>Mail professionnel</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
            href="/"
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/labo.png" alt="" width={35} height={35} className="rounded-md"/>
          <span>Résultat laboratoire</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
            href="/"
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/garde.png" alt="" width={35} height={35} className="rounded-md" />
          <span>Planning gardes médicales</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
            href="/"
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/technique.png" alt="" width={35} height={35} className="rounded-md" />
          <span>Assistance technique</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
            href="/"
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/informatique.png" alt="" width={35} height={35} className="rounded-md"/>
          <span>Assistance informatique</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
            href="/"
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/deces.png" alt="" width={35} height={35} className="rounded-md"/>
          <span>Gestions des décès</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
            href="/"
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/pharma.png" alt="" width={35} height={35} className="rounded-md"/>
          <span>Commandes pharmacie</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
            href="/"
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <Image src="/restauration.png" alt="" width={35} height={35} className="rounded-md"/>
          <span>Recharge self</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
      </div>
    </div>
  );
};

export default LeftMenu;
