"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center flex-grow">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-600 mb-4">ページが見つかりませんでした。</p>
        <Link href="/">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-2 px-4 rounded">
            ホームに戻る
          </button>
        </Link>
      </div>
    </div>
  );
}
