import { useState } from "react";

/* eslint-disable react/no-unescaped-entities */
export default function AddReview() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("")

  return (
    <>
      <div className="grid grid-cols-2">
        <form className="grid gap-3">
          <label
            htmlFor="note"
            className="text-gray-700 tracking-tight font-semibold"
          >
            Quelle note attribuez-vous à ce livre ?
          </label>
          <input
            required
            type="number"
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            min={0}
            max={5}
            className="form-input
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></input>
          <label
            htmlFor="readed"
            className="text-gray-700 tracking-tight font-semibold"
          >
            Quand avez-vous lu ce livre ?
          </label>
          <input
            required
            max={new Date().toISOString().slice(0, -14)}
            name="readed"
            type="date"
            className="form-input 
                      mt-1
                      block
                      w-full
                      rounded-md
                      border-gray-300
                      shadow-sm
                      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />

          <label
            htmlFor="title"
            className="text-gray-700 tracking-tight font-semibold"
          >
            Quel est le titre de votre critique ?
          </label>
          <input
            required
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></input>
          <label
            htmlFor="content"
            className="text-gray-700 tracking-tight font-semibold"
          >
            Qu'avez-vous pensé de cette ouvrage ?
          </label>
          <textarea
            required
            type="textarea"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-input
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                    min-h-[200px]
                    "
          ></textarea>
          <button className="w-full p-2 my-5 bg-purple-500 hover:bg-purple-600 text-white rounded-md shadow font-semibold max-w-fit">Poster votre critique</button>
        </form>
        <div className="grid-cols-1 gap-5 text-gray-700 px-8">
          <h2 className="font-semibold mb-10">Aperçu de votre critique</h2>
          {note && (
            <div class="font-light">Note attribuée à cet ouvrage : <span class="font-normal">{note} / 5</span></div>
          )}
          <p className="font-bold text-lg mb-3">{title}</p>
          {content && (
            <p>{content}</p>
          )}
        </div>
      </div>
    </>
  );
}
