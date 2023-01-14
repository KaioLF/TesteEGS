using System;
using System.IO;
using System.Collections.Generic;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace TesteEGSback
{
	class Usuario
    {
		public int Id {get; set;}
		public string? Nome {get; set;}
    	public string? Sobrenome {get; set;}
    	public string? DataNascimento {get; set;}
    	public string? Email {get; set;}
    	public string? CPF {get; set;} 	
    }
	
	class Database : DbContext
	{
		public Database(DbContextOptions options) : base(options) {}
		public DbSet<Usuario> Usuarios {get; set;} = null!;
	}
	
	class Program
	{
		static void Main(string[] args)
		{
			///////////////////////////
			//CONFIGURACAO DA APLICACAO
			///////////////////////////
			
			//cria builder da aplicacao
			var builder = WebApplication.CreateBuilder(args);
			
			//adiciona database ao builder
			builder.Services.AddSqlite<Database>(builder.Configuration.GetConnectionString("Database") ?? "Data Source=Database.db");
			
			//adiciona politica permissiva de cross-origin ao builder
			builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
			
			//cria aplicacao usando o builder
			var app = builder.Build();
			
			//ativa a politica de cross-origin
			app.UseCors();
			
			/////////////////
			//CRUD DO USUARIO
			/////////////////
			
			//lista usuarios
			app.MapGet("/usuarios", (Database database) =>
			{
				return database.Usuarios.ToList();
			});
			
			//cria usuario
			app.MapPost("/usuarios", (Database database, Usuario usuario) =>
			{
				database.Usuarios.Add(usuario);
				database.SaveChanges();
				return Results.Ok();
			});
			
			//le usuario
			app.MapGet("/usuarios/{id}", (Database database, int id) =>
			{
				return database.Usuarios.Find(id);
			});
			
			//atualiza usuario (apenas com os dados enviados no json)
			app.MapPut("/usuarios/{id}", (Database database, Usuario atualizado, int id) =>
			{
				var usuario = database.Usuarios.Find(id);
				if(usuario == null)
				{
					return Results.NotFound();
				}
				if(null != atualizado.Nome)usuario.Nome = atualizado.Nome;
				if(null != atualizado.Sobrenome)usuario.Sobrenome = atualizado.Sobrenome;
				if(null != atualizado.DataNascimento) usuario.DataNascimento = atualizado.DataNascimento;
				if(null != atualizado.Email)usuario.Email = atualizado.Email;
				if(null != atualizado.CPF)  usuario.CPF = atualizado.CPF;

				database.SaveChanges();
				return Results.Ok();
			});
			
			//deleta usuario
			app.MapDelete("/usuarios/{id}", (Database database, int id) =>
			{
				var usuario = database.Usuarios.Find(id);
				if(usuario == null)
				{
					return Results.NotFound();
				}
				database.Remove(usuario);
				database.SaveChanges();
				return Results.Ok();
			});
			
			///////////////////////
			//EXECUCAO DA APLICACAO
			///////////////////////
			
			//roda aplicacao na porta 3000 (arbitraria)
			app.Run("http://localhost:3000");
		}
	}
}