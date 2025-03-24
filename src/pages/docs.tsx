import Layout from '@/components/Layout';

export default function Docs() {
  return (
    <Layout>
      <div className="w-full max-w-[768px] mx-auto">
        <div className="bg-[#0D111C]/90 backdrop-blur-xl rounded-[32px] border border-[#1B2131] shadow-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Dokümantasyon</h1>
          
          <div className="space-y-6 text-[#B4B9C3]">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Başlangıç</h2>
              <p>HybridDEX, Ethereum ağında çalışan merkezi olmayan bir borsa protokolüdür.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Swap İşlemleri</h2>
              <p>Token takasları için Constant Product AMM formülü kullanılmaktadır: x * y = k</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Likidite Sağlama</h2>
              <p>Likidite sağlayıcıları, havuza token çifti ekleyerek LP token kazanırlar.</p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}