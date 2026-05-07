{
  description = "drinks — recipe-sharing app (Apollo GraphQL + React)";

  inputs = {
    lab.url = "github:phibkro/homelab";
    nixpkgs.follows = "lab/nixpkgs";
  };

  outputs =
    { lab, nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
        config.allowUnfree = true;
      };
      labShell = lab.lib.mkDevShell pkgs {
        modules = [
          "ts"
          "nodejs"
          "claude-code"
        ];
      };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        inputsFrom = [ labShell ];
        buildInputs = [
          pkgs.bun
          pkgs.openssl
          pkgs.prisma-engines_6
        ];
        shellHook = ''
          export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines_6}/bin/query-engine"
          export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines_6}/lib/libquery_engine.node"
          export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines_6}/bin/schema-engine"
          export PRISMA_FMT_BINARY="${pkgs.prisma-engines_6}/bin/prisma-fmt"
        '';
      };
    };
}
