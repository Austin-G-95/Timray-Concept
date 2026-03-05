'use client';

// @ts-ignore
import { usePaystackPayment } from 'react-paystack';


interface PaystackProps {
    amount: number; // in base currency (e.g., dollars)
    email: string;
    onSuccess?: (reference: any) => void;
    onClose?: () => void;
}

const PaystackCheckout = ({ amount, email, onSuccess, onClose }: PaystackProps) => {
    // Paystack expects amount in kobo/cents. If amount is 10, that's 10.00.
    // We multiply by 100.
    const config = {
        reference: (new Date()).getTime().toString(),
        email: email,
        amount: amount * 100, // Amount is in lowest denomination (kobo/cents)
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxx',
        currency: 'NGN', // Defaulting to NGN for Paystack, or 'USD' if international
    };

    const initializePayment = usePaystackPayment(config);

    return (
        <button
            onClick={() => {
                initializePayment({
                    onSuccess: (reference: any) => {
                        if (onSuccess) onSuccess(reference);
                    },
                    onClose: () => {
                        if (onClose) onClose();
                    }
                });
            }}
            className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] active:scale-95 group flex items-center justify-center"
        >
            <span className="mr-3">SECURE CHECKOUT</span>
            <span className="opacity-40 group-hover:opacity-100 transition-opacity">
                {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount)}
            </span>
        </button>
    );
};

export default PaystackCheckout;
