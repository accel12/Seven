using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PruebaTecnicaSeven.Models
{
	public class Comentario
	{
		[BsonId]
		[BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
		public string Id { get; set; }

		[BsonElement("comentarioTarea")]
		public string ComentarioTarea { get; set; }

		[BsonElement("idTarea")]
		public int IdTarea  { get; set; }

	}
}
