
import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, firestore, storage } from '../../firebase/dbcon';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const SignUpModal = ({ open, handler }: any) => {
  const formRef = useRef<any>();
  const fileInputRef = useRef<any>();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (e: any) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = formRef.current[0].value;
    const password = formRef.current[1].value;
    const name = formRef.current[2].value;

    let imageUrl = '';
    if (imageFile) {
      const imageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL: imageUrl });

      await setDoc(doc(firestore, 'users', userCredential.user.uid), {
        email,
        name,
        imageUrl,
        method: 'email',
        orders: []
      });

      handler();
    } catch (error: any) {
      console.error('Signup Error:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal={open}>
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden={open}></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img className="mx-auto h-10 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/2214px-How_to_use_icon.svg.png" alt="Sign Up" />
                  <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Join the Cult Mechanicus</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form ref={formRef} className="space-y-6" onSubmit={handleSignUp}>
                    <div>
                      <label className="block text-sm font-medium text-gray-900">Email address</label>
                      <input type="email" required className="block w-full rounded-md border px-3 py-2 mt-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900">Password</label>
                      <input type="password" required className="block w-full rounded-md border px-3 py-2 mt-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900">Display Name</label>
                      <input type="text" required className="block w-full rounded-md border px-3 py-2 mt-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900">Upload Avatar (optional)</label>
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="block w-full text-sm text-gray-500 mt-2" />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded">
                      Sign Up
                    </button>
                  </form>
                  <p className="mt-6 text-center text-sm text-gray-500">
                    <span className="font-semibold text-indigo-600">Metal is truth, flesh is weakness.</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" onClick={handler} className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
