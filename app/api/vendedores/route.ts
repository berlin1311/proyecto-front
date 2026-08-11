import { NextResponse} from 'next/server';
import {auth, clerkClient} from "@clerk/nextjs/server";

// verifica que quien llama sea admin
async function verifyAdmin() {
    const {sessionClaims, userId}= await auth();
    if (!userId ) return false; 
    const role =  (sessionClaims?.metadata as { role?:string } | undefined)?.role;
return role === "admin"; 
 }

 // GET: lista de todos los vendedores 

 export async function GET() {
    const esAdmin = await verifyAdmin();
    if (!esAdmin) {
        return NextResponse.json({error: "No autorizado"}, {status: 403});
    }

    const client = await clerkClient();
    const {data: users}= await client.users.getUserList({limit: 100});

    const vendedores= users
    .filter((u)=> (u.publicMetadata as { role?: string }) ?.role === "vendedor")
    .map((u)=> ({
        id: u.id,
        nombre: `${u.firstName ?? ""} ${u.lastName ?? ""}` .trim () || u.username,
        email: u.emailAddresses[0]?.emailAddress ?? "",
        username: u.username ?? "",
        creado: u.createdAt,
    }));
    return NextResponse.json({vendedores});

 }

 // POST: crear un nuevo vendedor
 export async function POST(req: Request) {
    const esAdmin = await verifyAdmin();
    if (!esAdmin) {
        return NextResponse.json({error: "No autorizado"},
             {status: 403});
    }

    try {
        const body= await req.json();
        const {nombre, apellido, username, email,password}= body;

        if (!username || !password) {
        return NextResponse.json(
            {error: "usuarios y contraseña son obligatorios"},
            {status: 400}
        );
        }
         
        const client = await clerkClient();

        const nuevoUsuario = await client.users.createUser({
            firstName: nombre || undefined,
            lastName: apellido || undefined,
            username,
            emailAddress: email? [email]: undefined,
            password,
            publicMetadata: {role: "vendedor"},
        });

        return NextResponse.json({
            ok:true, 
            vendedor: { id: nuevoUsuario.id, username: nuevoUsuario.username },
       });
    }  catch (error: any) { 
        const mensaje =
         error?.errors?.[0]?.longMessage ??
         error?.message ?? "no se pudo crear el vendedor";
        return NextResponse.json({error: mensaje}, {status: 400});
     }

 }