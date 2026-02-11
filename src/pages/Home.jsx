import { ShoppingCart, Monitor, Cpu, HardDrive, Headphones, Truck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
          <div>
            <h1 className="text-4xl font-bold mb-6">
              Your One-Stop Computer Shop
            </h1>
            <p className="text-slate-300 mb-8">
              Laptops, desktops, components & accessories.
            </p>
            <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-medium">
              Shop Now
            </button>
          </div>
        </div>
      </section>

     
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[Monitor, Cpu, HardDrive, Headphones, Truck].map((Icon, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-lg"
            >
              <Icon className="mx-auto mb-3 h-10 w-10 text-slate-700" />
              <p className="font-medium">Category</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
