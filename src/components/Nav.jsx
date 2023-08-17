import "./Nav.css"
import {UserButton} from "@clerk/clerk-react";

export default function Nav() {

  return (
    <nav className="w-auto bg-[#151515] p-12">
        <div className="flex justify-between">
            <h1 className="drop-shadow-[0px_3px_3px_rgba(100,255,255,0.5)]  ml-[4%] mt-2 font-bold text-blue-400 text-4xl">MASTER CHAT</h1>
            <div className="drop-shadow-[0_0px_3px_rgba(0,187,255,0.2)] mt-4 mr-[5%] flex bold  userbutton">
                <UserButton />
            </div>
        </div>
    </nav>
  )
}
