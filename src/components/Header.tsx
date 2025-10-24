import logoSemcas from "@/assets/logo-semcas.png";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary shadow-md">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center gap-3 md:gap-4 flex-wrap">
          <img
            src={logoSemcas}
            alt="Logo SEMCAS São Luís"
            className="h-12 md:h-16 lg:h-20 w-auto drop-shadow-lg"
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-primary-foreground leading-tight">
              CONTROLE DE ALMOXARIFADO
            </h1>
            <p className="text-xs md:text-sm text-primary-foreground/80 mt-1">
              SEMCAS - Secretaria Municipal da Criança e Assistência Social
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
