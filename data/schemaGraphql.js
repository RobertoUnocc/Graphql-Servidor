
export const typeDefs = `

type Cliente {
    id: ID
    nombre: String
    apellido: String
    empresa: String
    emails: [Email]
    edad: Int
    tipo: TipoCliente
}
type Email {
    email: String
}

enum TipoCliente {
    PREMIUM
    BASICO
}
enum EstadoPedido {
    PENDIENTE
    COMPLETADO
    CANCELADO
}

type Producto{
    id: ID
    nombre: String!
    precio : Int!
    stock: Int!
}


type PedidoProducto{
    id:ID
    cantidad: Int
}
type Pedido{
    id: ID
    pedido:[PedidoProducto]
    total: Int
    fecha: String
    cliente: ID
    estado: EstadoPedido
}

type ClienteTotal{
    total: Float
    cliente : [Cliente]
}
type VendedorTotal{
    total: Float
    vendedor : [Usuario]
}

type Usuario{
    id: ID
    usuario: String
    nombre:String
    rol:String
}
type Token{
    token : String
}


#Obtener  Datos del Cliente
type Query {
    #Obtener los Clientes
    getClientes(limite: Int , offset: Int,VendedorID:String) : [Cliente]
    getCliente(id: ID): Cliente
    totalClientes(VendedorID:String): String

    #Producto
    obtenerProductos(limite: Int ,offset : Int,stock : Boolean) : [Producto]
    obtenerProducto(id:ID): Producto
    totalProductos: String

    #pedidos
    totalPedidosCliente(id_cliente : ID) : [Pedido]

    #Graficas
    topClientes : [ClienteTotal]
    topVendedores: [VendedorTotal]

    #Usuarios
    obtenerUsuario: Usuario
}







input EmailInput {
    email: String
}

input ClienteInput {
    id: ID
    nombre: String!
    apellido: String!
    empresa: String!
    emails: [EmailInput]
    edad: Int!
    tipo: TipoCliente!
    pedidos: [PedidoInput]
    VendedorID : ID
}

input ProductoInput{
    id: ID
    nombre: String!
    precio : Int!
    stock: Int!
}
input PedidoProductoInput{
    id:ID
    cantidad: Int
}
input PedidoInput{
    id: ID
    pedido:[PedidoProductoInput]
    total: Int
    fecha: String
    cliente: ID
    estado: EstadoPedido
    vendedor : ID
}




#Operaciones Clientes
type Mutation {

    """ Te permite Crear nuevos Clientes """
    crearCliente(input: ClienteInput): Cliente

    """ Actualizando clientes """
    actualizarCliente(input: ClienteInput): Cliente

    """ Eliminar cliente """
    eliminarCliente(id: ID!): String




    """ Producto """
    nuevoProducto( input: ProductoInput) : Producto

    """ Actualizando Producto """
    actualizarProducto(input: ProductoInput): Producto
    
    eliminarProducto(id: ID!): String




    """PEDIDOS"""
     nuevoPedido(input: PedidoInput) : Pedido
     actualizarEstado( input : PedidoInput ) : String


     """Usuarios"""
     crearUsuario(usuario: String! ,nombre: String!, password : String!,rol :String! ) : String
     autenticarUsuario(usuario: String! , password : String! ) : Token
}



`;