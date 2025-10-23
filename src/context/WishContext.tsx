import { createContext, useContext, useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';

export interface Wish {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
}

interface WishContextType {
  wishes: Wish[];
  addWish: (wish: Omit<Wish, 'id' | 'createdAt'>) => Promise<void>;
  updateWish: (id: number, wish: Omit<Wish, 'id' | 'createdAt'>) => Promise<void>;
  deleteWish: (id: number) => Promise<void>;
}

const WishContext = createContext<WishContextType | undefined>(undefined);

export const WishProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const { get, post, put, del } = useApi();

  const fetchWishes = async () => {
    try {
      const data = await get('http://localhost:3001/wishes');
      setWishes(data);
    } catch (error) {
      console.error('Failed to fetch wishes', error);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const addWish = async (wish: Omit<Wish, 'id' | 'createdAt'>) => {
    const newWish = {
      ...wish,
      createdAt: new Date().toISOString(),
    };
    const created = await post('http://localhost:3001/wishes', newWish);
    setWishes(prev => [...prev, created]);
  };

  const updateWish = async (id: number, wish: Omit<Wish, 'id' | 'createdAt'>) => {
    const updated = await put(`http://localhost:3001/wishes/${id}`, {
      ...wish,
      createdAt: new Date().toISOString(),
    });
    setWishes(prev => prev.map(w => (w.id === id ? updated : w)));
  };

  const deleteWish = async (id: number) => {
    await del(`http://localhost:3001/wishes/${id}`);
    setWishes(prev => prev.filter(w => w.id !== id));
  };

  return (
    <WishContext.Provider value={{ wishes, addWish, updateWish, deleteWish }}>
      {children}
    </WishContext.Provider>
  );
};

export const useWishContext = () => {
  const context = useContext(WishContext);
  if (!context) throw new Error('useWishContext must be used within a WishProvider');
  return context;
};