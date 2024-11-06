import Image from "next/image";

const avatarList = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
  "/avatars/avatar7.png",
  "/avatars/avatar8.png",
  "/avatars/avatar9.png",
  "/avatars/avatar10.png",
  "/avatars/avatar11.png",
];

export default function AvatarSelection({ onAvatarSelect }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {avatarList.map((avatar, index) => (
        <Image
          key={index}
          src={avatar}
          alt={`Avatar ${index + 1}`}
          width={80}
          height={80}
          className="cursor-pointer rounded-full hover:scale-105 transition-transform"
          onClick={() => onAvatarSelect(avatar)}
        />
      ))}
    </div>
  );
}
