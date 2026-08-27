import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Star, 
  Zap, 
  CheckCircle, 
  Percent,
  SlidersHorizontal,
  Flame
} from 'lucide-react';

interface ProductListProps {
  onGrabTask: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({ onGrabTask }) => {
  const { products, completeTask, lang, currentUser, setActiveTab } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Smart Wearables', 'Audio & Gadgets', 'Cameras & Drones', 'Computer Accessories', 'Home Appliances', 'Fashion & Footwear'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.titleBn.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleOrder = (product: Product) => {
    const res = completeTask(product.id);
    if (!res.success && (currentUser?.dailyTasksCompleted || 0) >= (currentUser?.dailyTaskLimit || 10)) {
      // Prompt user or redirect to grab page
      setActiveTab('grab');
    }
  };

  return (
    <div className="space-y-5 pb-20 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-black text-slate-100">
              {lang === 'bn' ? 'দৈনিক ই-কমার্স পণ্য তালিকা' : 'Daily Product Commission Catalog'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'bn' 
              ? 'প্রতিটি পণ্যের অর্ডারে নিশ্চিত ৩% - ৮% দৈনিক লাভ পান।' 
              : 'Earn 3% - 8% guaranteed commission on daily merchant product orders.'}
          </p>
        </div>

        {/* Task Counter Badge */}
        <div className="bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-slate-400">{lang === 'bn' ? 'আজকের টাস্ক বাকি:' : 'Daily Tasks Left:'}</span>
          <span className="font-extrabold text-emerald-400">
            {Math.max(0, (currentUser?.dailyTaskLimit || 10) - (currentUser?.dailyTasksCompleted || 0))}
          </span>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'bn' ? 'পণ্য বা গ্যাজেট খুঁজুন...' : 'Search products, electronics, gadgets...'}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 group hover:shadow-xl hover:shadow-emerald-950/20"
          >
            <div>
              {/* Image & Badges */}
              <div className="relative rounded-xl overflow-hidden aspect-video sm:aspect-square mb-3 bg-slate-950">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Commission Tag */}
                <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-lg bg-emerald-500/90 backdrop-blur-sm text-slate-950 font-black text-xs shadow-md flex items-center gap-1">
                  <Percent className="w-3 h-3" />
                  <span>{product.commissionPercent}% Commission</span>
                </div>

                {/* VIP level badge */}
                <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg bg-slate-950/80 backdrop-blur-sm text-amber-300 font-bold text-[10px] border border-amber-500/30">
                  VIP {product.vipRequired}+
                </div>
              </div>

              {/* Title */}
              <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                {product.category}
              </div>
              <h3 className="font-bold text-sm text-slate-100 line-clamp-2 mb-1.5 leading-snug">
                {lang === 'bn' ? product.titleBn : product.title}
              </h3>

              {/* Rating & Sold count */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-3">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 mr-0.5" />
                  <span className="font-bold">{product.rating}</span>
                </div>
                <span>•</span>
                <span>{product.soldCount.toLocaleString()} {lang === 'bn' ? 'অর্ডার সম্পন্ন' : 'Sold'}</span>
              </div>
            </div>

            {/* Price & Earning Footer */}
            <div className="pt-3 border-t border-slate-800/80">
              <div className="flex items-baseline justify-between mb-2">
                <div>
                  <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'পণ্য মূল্য:' : 'Retail Price:'}</span>
                  <span className="text-base font-extrabold text-slate-100">৳{product.price.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-400 block">{lang === 'bn' ? 'আপনার আয়:' : 'Your Commission:'}</span>
                  <span className="text-base font-black text-emerald-400">+৳{product.commissionAmount}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOrder(product)}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                <span>{lang === 'bn' ? 'কমিশন অর্ডার গ্র্যাব করুন' : 'Grab Order Commission'}</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
