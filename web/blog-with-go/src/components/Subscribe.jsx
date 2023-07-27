export default function Subscribe() {
    return (
        <div className="w-96 glass fixed bottom-10 right-10 shadow border-none">
            <div className="p-4 bg-white rounded">
                <h2 className="text-xl mb-2">Subscribe to Blog</h2>
                <input type="email" placeholder="example@mail.com" className="input w-full mb-2 bg-gray-200 p-2 outline-none" />
                <button className="btn bg-primary text-white border-none hover:bg-primary/90">Subscribe</button>
            </div>
        </div>
    );
}